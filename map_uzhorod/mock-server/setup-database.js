const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbType = process.env.DB_TYPE || 'mysql';

async function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  // Look for SQL backup file
  const sqlFiles = [
    path.join(__dirname, 'backup_maps.sql'),
    path.join(__dirname, 'backup.sql'),
    path.join(__dirname, 'database.sql'),
    path.join(__dirname, 'dump.sql'),
    path.join(__dirname, '..', 'backup_maps.sql'),
    path.join(__dirname, '..', 'backup.sql'),
    path.join(__dirname, '..', 'database.sql'),
    path.join(__dirname, '..', 'dump.sql')
  ];
  
  let sqlFile = null;
  for (const file of sqlFiles) {
    if (fs.existsSync(file)) {
      sqlFile = file;
      console.log(`📄 Found SQL file: ${file}`);
      break;
    }
  }
  
  if (!sqlFile) {
    console.log('⚠️  No SQL backup file found. Looking for:');
    sqlFiles.forEach(f => console.log(`   - ${f}`));
    console.log('\n💡 Please place your SQL backup file in one of these locations.');
    return;
  }
  
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  
  try {
    if (dbType === 'mysql') {
      await setupMySQL(sqlContent);
    } else if (dbType === 'postgres') {
      await setupPostgreSQL(sqlContent);
    } else {
      console.error('❌ Unknown database type. Use DB_TYPE=mysql or DB_TYPE=postgres');
    }
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

async function setupMySQL(sqlContent) {
  const mysql = require('mysql2/promise');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
  };
  
  console.log('🔌 Connecting to MySQL...');
  const connection = await mysql.createConnection(config);
  
  const dbName = process.env.DB_NAME || 'uzh-map-backend';
  
  // Create database if it doesn't exist
  console.log(`📦 Creating database '${dbName}' if it doesn't exist...`);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.query(`USE \`${dbName}\``);
  
  // Split SQL content by semicolons and execute
  console.log('📥 Restoring database from SQL file...');
  const statements = sqlContent
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (statement) {
      try {
        await connection.query(statement);
        if ((i + 1) % 10 === 0) {
          console.log(`   Processed ${i + 1}/${statements.length} statements...`);
        }
      } catch (error) {
        // Ignore some common errors
        if (!error.message.includes('already exists') && 
            !error.message.includes('Duplicate')) {
          console.warn(`   Warning on statement ${i + 1}: ${error.message}`);
        }
      }
    }
  }
  
  await connection.end();
  console.log('✅ MySQL database setup completed!');
}

async function setupPostgreSQL(sqlContent) {
  const { Client } = require('pg');
  
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'postgres';
  const port = parseInt(process.env.DB_PORT || 5432);
  const password = (process.env.DB_PASSWORD !== undefined) ? String(process.env.DB_PASSWORD) : '';
  
  const config = {
    host: host,
    user: user,
    port: port,
    database: 'postgres'
  };
  
  if (password && password.trim() !== '') {
    config.password = password;
  }
  
  console.log('🔌 Connecting to PostgreSQL...');
  const client = new Client(config);
  await client.connect();
  
  const dbName = process.env.DB_NAME || 'uzh-map-backend';
  
  // Create database if it doesn't exist
  console.log(`📦 Creating database '${dbName}' if it doesn't exist...`);
  try {
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`   Database '${dbName}' created`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`   Database '${dbName}' already exists`);
    } else {
      throw error;
    }
  }
  
  await client.end();
  
  const dbPassword = (process.env.DB_PASSWORD !== undefined) ? String(process.env.DB_PASSWORD) : '';
  
  const dbConfig = {
    host: host,
    user: user,
    port: port,
    database: dbName
  };
  
  if (dbPassword && dbPassword.trim() !== '') {
    dbConfig.password = dbPassword;
  }
  
  const dbClient = new Client(dbConfig);
  await dbClient.connect();
  
  // Execute SQL content
  console.log('📥 Restoring database from SQL file...');
  try {
    await dbClient.query(sqlContent);
    console.log('✅ PostgreSQL database setup completed!');
  } catch (error) {
    console.error('Error executing SQL:', error.message);
    throw error;
  }
  
  await dbClient.end();
}

// Run setup
setupDatabase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

