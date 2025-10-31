const sql = require('mssql');

// Azure SQL configuration
const config = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            fullName,
            email,
            country,
            ageRange,
            occupation,
            primaryGovernanceProblem,
            problemImpact,
            specificExample,
            willingToParticipate,
            submitted_at
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !country || !ageRange || !occupation || 
            !primaryGovernanceProblem || !problemImpact || !willingToParticipate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Connect to database
        const pool = await sql.connect(config);

        // Insert data with schema name
        await pool.request()
            .input('fullName', sql.NVarChar, fullName)
            .input('email', sql.NVarChar, email)
            .input('country', sql.NVarChar, country)
            .input('ageRange', sql.NVarChar, ageRange)
            .input('occupation', sql.NVarChar, occupation)
            .input('primaryGovernanceProblem', sql.NVarChar, primaryGovernanceProblem)
            .input('problemImpact', sql.NVarChar, problemImpact)
            .input('specificExample', sql.NVarChar, specificExample || null)
            .input('willingToParticipate', sql.NVarChar, willingToParticipate)
            .input('submittedAt', sql.DateTime2, submitted_at || new Date().toISOString())
            .query(`
                INSERT INTO NepsixResearch.governance_research 
                (full_name, email, country, age_range, occupation, 
                 primary_governance_problem, problem_impact, specific_example, 
                 willing_to_participate, submitted_at)
                VALUES 
                (@fullName, @email, @country, @ageRange, @occupation, 
                 @primaryGovernanceProblem, @problemImpact, @specificExample, 
                 @willingToParticipate, @submittedAt)
            `);

        // Close connection
        await pool.close();

        return res.status(201).json({ 
            success: true, 
            message: 'Research data submitted successfully' 
        });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ 
            error: 'Failed to submit data',
            message: error.message 
        });
    }
};