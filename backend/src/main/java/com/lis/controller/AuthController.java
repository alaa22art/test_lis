package com.lis.controller;

import com.lis.dto.request.LoginRequestDto;
import com.lis.dto.response.ApiResponseDto;
import com.lis.dto.response.AuthResponseDto;
import com.lis.model.User;
import com.lis.repository.UserRepository;
import com.lis.security.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user and return JWT token")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(userDetails);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        AuthResponseDto authResponse = new AuthResponseDto(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().getName() : null
        );

        return ResponseEntity.ok(ApiResponseDto.success("Login successful", authResponse));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Get currently authenticated user information")
    public ResponseEntity<ApiResponseDto<User>> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ResponseEntity.ok(ApiResponseDto.success("User retrieved successfully", user));
    }
}
