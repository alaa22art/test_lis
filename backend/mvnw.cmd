@echo off
setlocal enabledelayedexpansion

if "%JAVA_HOME%" == "" (
    echo Error: JAVA_HOME not found in your environment.
    echo Please set the JAVA_HOME variable to match your Java installation.
    exit /b 1
)

if not exist "%JAVA_HOME%\bin\java.exe" (
    echo Error: JAVA_HOME is set to an invalid directory.
    echo JAVA_HOME = "%JAVA_HOME%"
    echo Please set the JAVA_HOME variable to match your Java installation.
    exit /b 1
)

set MAVEN_PROJECTBASEDIR=%~dp0
set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
set WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

if not exist %WRAPPER_JAR% (
    echo Downloading Maven Wrapper...
    powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%', '%WRAPPER_JAR:~1,-1%')}"
    if errorlevel 1 (
        echo Error: Failed to download Maven Wrapper
        exit /b 1
    )
)

"%JAVA_HOME%\bin\java.exe" -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %*

exit /b %errorlevel%
