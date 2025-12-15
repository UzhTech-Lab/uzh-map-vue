const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let db;
const dbType = process.env.DB_TYPE || 'mysql'; // 'mysql' or 'postgres'

async function connectDatabase() {
  try {
    if (dbType === 'mysql') {
      const mysql = require('mysql2/promise');
      db = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'uzh-map-backend',
        port: process.env.DB_PORT || 3306
      });
      console.log('✅ Connected to MySQL database');
    } else if (dbType === 'postgres') {
      const { Pool } = require('pg');
      db = new Pool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'uzh-map-backend',
        port: process.env.DB_PORT || 5432
      });
      // Test connection
      await db.query('SELECT NOW()');
      console.log('✅ Connected to PostgreSQL database');
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('⚠️  Running in mock mode without database');
    db = null;
  }
}

// Helper function to execute queries
async function query(sql, params = []) {
  if (!db) {
    // Return mock data if database is not available
    return getMockData(sql);
  }
  
  try {
    if (dbType === 'mysql') {
      const [results] = await db.execute(sql, params);
      return results;
    } else {
      const result = await db.query(sql, params);
      return result.rows;
    }
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

// Mock data fallback
function getMockData(sql) {
  const sqlLower = sql.toLowerCase();
  
  if (sqlLower.includes('community')) {
    return [
      { id: 1, name: 'Sample Community 1', slug: 'sample-community-1', description: 'A sample community' },
      { id: 2, name: 'Sample Community 2', slug: 'sample-community-2', description: 'Another sample community' }
    ];
  }
  if (sqlLower.includes('problems')) {
    return [
      { id: 1, title: 'Sample Problem 1', slug: 'sample-problem-1', description: 'A sample problem', community_id: 1 },
      { id: 2, title: 'Sample Problem 2', slug: 'sample-problem-2', description: 'Another problem', community_id: 1 }
    ];
  }
  if (sqlLower.includes('solutions')) {
    return [
      { id: 1, title: 'Sample Solution 1', slug: 'sample-solution-1', description: 'A sample solution', problem_id: 1 },
      { id: 2, title: 'Sample Solution 2', slug: 'sample-solution-2', description: 'Another solution', problem_id: 1 }
    ];
  }
  return [];
}

// API Routes
const router = express.Router();

router.get('/v1', (req, res) => {
  res.json({
    message: 'UZH Map API v1',
    endpoints: {
      health: '/api/health',
      community: '/api/v1/community',
      problems: '/api/v1/problems',
      solutions: '/api/v1/solutions'
    },
    version: '1.0.0'
  });
});

// Community routes
router.get('/v1/community', async (req, res) => {
  try {
    const { search, region } = req.query;
    let sql = 'SELECT * FROM community WHERE 1=1';
    const params = [];
    
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    if (region) {
      sql += ' AND region = ?';
      params.push(region);
    }
    
    const results = await query(sql, params);
    res.json(results);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/community/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM community WHERE id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/community/slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const sql = 'SELECT * FROM community WHERE slug = ?';
    const results = await query(sql, [slug]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/community/:id/stats', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM community_stats WHERE community_id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.json({ views: 0, likes: 0, shares: 0 });
    }
    
    res.json(results[0]);
  } catch (error) {
    // If stats table doesn't exist, return default
    res.json({ views: 0, likes: 0, shares: 0 });
  }
});

router.get('/v1/community/:id/problems', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM problems WHERE community_id = ?';
    const results = await query(sql, [id]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/community/:id/solutions', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT s.* FROM solutions s
      INNER JOIN problems p ON s.problem_id = p.id
      WHERE p.community_id = ?
    `;
    const results = await query(sql, [id]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/community/:id/community', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM community WHERE id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Problem routes
router.get('/v1/problems', async (req, res) => {
  try {
    const sql = 'SELECT * FROM problems';
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/problems/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM problems WHERE id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/problems/slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const sql = 'SELECT * FROM problems WHERE slug = ?';
    const results = await query(sql, [slug]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/problems/:id/stats', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM problem_stats WHERE problem_id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.json({ views: 0, likes: 0, shares: 0 });
    }
    
    res.json(results[0]);
  } catch (error) {
    res.json({ views: 0, likes: 0, shares: 0 });
  }
});

router.get('/v1/problems/:id/solutions', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM solutions WHERE problem_id = ?';
    const results = await query(sql, [id]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/problems/:id/community', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT c.* FROM community c
      INNER JOIN problems p ON c.id = p.community_id
      WHERE p.id = ?
    `;
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.json({});
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.json({});
  }
});

// Solution routes
router.get('/v1/solutions', async (req, res) => {
  try {
    const sql = 'SELECT * FROM solutions';
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/solutions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM solutions WHERE id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/solutions/slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const sql = 'SELECT * FROM solutions WHERE slug = ?';
    const results = await query(sql, [slug]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/v1/solutions/:id/stats', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = 'SELECT * FROM solution_stats WHERE solution_id = ?';
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.json({ views: 0, likes: 0, shares: 0 });
    }
    
    res.json(results[0]);
  } catch (error) {
    res.json({ views: 0, likes: 0, shares: 0 });
  }
});

router.get('/v1/solutions/:id/community', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT c.* FROM community c
      INNER JOIN problems p ON c.id = p.community_id
      INNER JOIN solutions s ON p.id = s.problem_id
      WHERE s.id = ?
    `;
    const results = await query(sql, [id]);
    
    if (results.length === 0) {
      return res.json({});
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.json({});
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: db ? 'connected' : 'mock mode'
  });
});

app.use('/api', router);

// Start server
async function startServer() {
  await connectDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api/v1`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database: ${db ? 'Connected' : 'Mock mode (no database)'}`);
  });
}

startServer().catch(console.error);

