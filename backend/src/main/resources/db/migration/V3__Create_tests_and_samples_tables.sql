-- Create test_catalog table (available tests)
CREATE TABLE test_catalog (
    id BIGSERIAL PRIMARY KEY,
    test_code VARCHAR(50) UNIQUE NOT NULL,
    test_name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    sample_type VARCHAR(50) NOT NULL,
    unit VARCHAR(50),
    reference_range_min DECIMAL(10, 2),
    reference_range_max DECIMAL(10, 2),
    turnaround_time_hours INTEGER,
    price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create samples table
CREATE TABLE samples (
    id BIGSERIAL PRIMARY KEY,
    sample_barcode VARCHAR(100) UNIQUE NOT NULL,
    patient_id BIGINT REFERENCES patients(id) NOT NULL,
    sample_type VARCHAR(50) NOT NULL,
    collection_date TIMESTAMP NOT NULL,
    collected_by BIGINT REFERENCES users(id),
    received_date TIMESTAMP,
    received_by BIGINT REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'COLLECTED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_sample_status CHECK (status IN ('COLLECTED', 'RECEIVED', 'PROCESSING', 'COMPLETED', 'REJECTED'))
);

-- Create test_orders table
CREATE TABLE test_orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    patient_id BIGINT REFERENCES patients(id) NOT NULL,
    sample_id BIGINT REFERENCES samples(id),
    test_id BIGINT REFERENCES test_catalog(id) NOT NULL,
    ordered_by BIGINT REFERENCES users(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority VARCHAR(20) DEFAULT 'NORMAL',
    status VARCHAR(50) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_priority CHECK (priority IN ('NORMAL', 'URGENT', 'STAT')),
    CONSTRAINT chk_order_status CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'))
);

-- Create test_results table
CREATE TABLE test_results (
    id BIGSERIAL PRIMARY KEY,
    test_order_id BIGINT REFERENCES test_orders(id) NOT NULL,
    result_value VARCHAR(500),
    result_numeric DECIMAL(10, 2),
    result_text TEXT,
    unit VARCHAR(50),
    reference_range VARCHAR(100),
    is_abnormal BOOLEAN DEFAULT FALSE,
    tested_by BIGINT REFERENCES users(id),
    tested_date TIMESTAMP,
    verified_by BIGINT REFERENCES users(id),
    verified_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING',
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_result_status CHECK (status IN ('PENDING', 'PRELIMINARY', 'VERIFIED', 'CORRECTED'))
);

-- Create indexes
CREATE INDEX idx_samples_barcode ON samples(sample_barcode);
CREATE INDEX idx_samples_patient ON samples(patient_id);
CREATE INDEX idx_test_orders_order_number ON test_orders(order_number);
CREATE INDEX idx_test_orders_patient ON test_orders(patient_id);
CREATE INDEX idx_test_results_order ON test_results(test_order_id);

-- Insert sample test catalog data
INSERT INTO test_catalog (test_code, test_name, description, category, sample_type, unit, reference_range_min, reference_range_max, turnaround_time_hours, price) VALUES
    ('CBC', 'Complete Blood Count', 'Measures different components of blood', 'Hematology', 'BLOOD', 'cells/mcL', 4000, 11000, 24, 25.00),
    ('GLU', 'Glucose', 'Blood sugar level test', 'Chemistry', 'BLOOD', 'mg/dL', 70, 100, 2, 15.00),
    ('HBA1C', 'Hemoglobin A1C', 'Average blood sugar over 3 months', 'Chemistry', 'BLOOD', '%', 4.0, 5.6, 48, 35.00),
    ('LIPID', 'Lipid Panel', 'Cholesterol and triglycerides', 'Chemistry', 'BLOOD', 'mg/dL', NULL, NULL, 24, 40.00),
    ('TSH', 'Thyroid Stimulating Hormone', 'Thyroid function test', 'Endocrinology', 'BLOOD', 'mIU/L', 0.4, 4.0, 48, 45.00);
