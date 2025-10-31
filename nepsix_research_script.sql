-- Step 1: Create the schema
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = N'NepsixResearch')
BEGIN
    EXEC('CREATE SCHEMA NepsixResearch');
END
GO

-- Step 2: Create the table (note the schema.table format)
CREATE TABLE NepsixResearch.governance_research (
    id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    country NVARCHAR(100) NOT NULL,
    age_range NVARCHAR(50) NOT NULL,
    occupation NVARCHAR(100) NOT NULL,
    primary_governance_problem NVARCHAR(255) NOT NULL,
    problem_impact NVARCHAR(MAX) NOT NULL,
    specific_example NVARCHAR(MAX),
    willing_to_participate NVARCHAR(50) NOT NULL,
    submitted_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_at DATETIME2 DEFAULT GETDATE()
);
GO

-- Step 3: Create indexes for better query performance
CREATE INDEX idx_country ON NepsixResearch.governance_research(country);
CREATE INDEX idx_problem ON NepsixResearch.governance_research(primary_governance_problem);
CREATE INDEX idx_occupation ON NepsixResearch.governance_research(occupation);
CREATE INDEX idx_submitted_at ON NepsixResearch.governance_research(submitted_at);
GO