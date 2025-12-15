require('dotenv').config();

const dbType = process.env.DB_TYPE || 'mysql';

async function checkDatabase() {
  console.log('🔍 Checking database connection and existence...\n');
  
  try {
    if (dbType === 'mysql') {
      await checkMySQL();
    } else if (dbType === 'postgres') {
      await checkPostgreSQL();
    } else {
      console.error('❌ Unknown database type. Use DB_TYPE=mysql or DB_TYPE=postgres');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function checkMySQL() {
  const mysql = require('mysql2/promise');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  };
  
  console.log('📊 MySQL Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Password: ${config.password ? '***' : '(empty)'}\n`);
  
  try {
    console.log('🔌 Connecting to MySQL server...');
    const connection = await mysql.createConnection(config);
    console.log('✅ Successfully connected to MySQL server\n');
    
    // Check if database exists
    const dbName = process.env.DB_NAME || 'uzh-map-backend';
    console.log(`📦 Checking if database '${dbName}' exists...`);
    
    const [databases] = await connection.query('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === dbName);
    
    if (dbExists) {
      console.log(`✅ Database '${dbName}' exists\n`);
      
      // Connect to the database and check tables
      await connection.query(`USE \`${dbName}\``);
      const [tables] = await connection.query('SHOW TABLES');
      
      if (tables.length > 0) {
        console.log(`📋 Found ${tables.length} table(s):`);
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
        
        // Check for key tables
        const tableNames = tables.map(t => Object.values(t)[0]);
        const keyTables = ['community', 'problems', 'solutions'];
        const missingTables = keyTables.filter(t => !tableNames.includes(t));
        
        if (missingTables.length > 0) {
          console.log(`\n⚠️  Missing key tables: ${missingTables.join(', ')}`);
        } else {
          console.log(`\n✅ All key tables exist`);
        }
        
        // Count records in key tables
        console.log('\n📊 Record counts:');
        for (const table of keyTables) {
          if (tableNames.includes(table)) {
            try {
              const [count] = await connection.query(`SELECT COUNT(*) as count FROM \`${table}\``);
              console.log(`   ${table}: ${count[0].count} records`);
            } catch (err) {
              console.log(`   ${table}: Error counting (${err.message})`);
            }
          }
        }
      } else {
        console.log('⚠️  Database exists but has no tables');
      }
    } else {
      console.log(`❌ Database '${dbName}' does not exist`);
      console.log(`\n💡 To create the database, run: npm run setup-db`);
    }
    
    await connection.end();
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to MySQL server');
      console.error('   Make sure MySQL is running and the connection details are correct');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('❌ Access denied');
      console.error('   Check your username and password in .env file');
    } else {
      console.error('❌ Error:', error.message);
    }
    throw error;
  }
}

async function checkPostgreSQL() {
  const { Client } = require('pg');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || 5432),
    database: 'postgres'
  };
  
  console.log('📊 PostgreSQL Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Password: ${config.password ? '***' : '(empty)'}\n`);
  
  try {
    console.log('🔌 Connecting to PostgreSQL server...');
    const client = new Client(config);
    await client.connect();
    console.log('✅ Successfully connected to PostgreSQL server\n');
    
    // Check if database exists
    const dbName = process.env.DB_NAME || 'uzh-map-backend';
    console.log(`📦 Checking if database '${dbName}' exists...`);
    
    const result = await client.query(
      "SELECT datname FROM pg_database WHERE datname = $1",
      [dbName]
    );
    
    const dbExists = result.rows.length > 0;
    
    if (dbExists) {
      console.log(`✅ Database '${dbName}' exists\n`);
      
      await client.end();
      
      const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT || 5432),
        database: dbName
      };
      
      const dbClient = new Client(dbConfig);
      await dbClient.connect();
      
      // Check tables
      const tablesResult = await dbClient.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `);
      
      if (tablesResult.rows.length > 0) {
        console.log(`📋 Found ${tablesResult.rows.length} table(s):`);
        tablesResult.rows.forEach(row => {
          console.log(`   - ${row.table_name}`);
        });
        
        // Check for key tables
        const tableNames = tablesResult.rows.map(r => r.table_name);
        const keyTables = ['community', 'problems', 'solutions'];
        const missingTables = keyTables.filter(t => !tableNames.includes(t));
        
        if (missingTables.length > 0) {
          console.log(`\n⚠️  Missing key tables: ${missingTables.join(', ')}`);
        } else {
          console.log(`\n✅ All key tables exist`);
        }
        
        // Count records in key tables
        console.log('\n📊 Record counts:');
        for (const table of keyTables) {
          if (tableNames.includes(table)) {
            try {
              const countResult = await dbClient.query(`SELECT COUNT(*) as count FROM ${table}`);
              console.log(`   ${table}: ${countResult.rows[0].count} records`);
            } catch (err) {
              console.log(`   ${table}: Error counting (${err.message})`);
            }
          }
        }
      } else {
        console.log('⚠️  Database exists but has no tables');
      }
      
      await dbClient.end();
    } else {
      console.log(`❌ Database '${dbName}' does not exist`);
      console.log(`\n💡 To create the database, run: npm run setup-db`);
      await client.end();
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to PostgreSQL server');
      console.error('   Make sure PostgreSQL is running and the connection details are correct');
    } else if (error.code === '28P01') {
      console.error('❌ Authentication failed');
      console.error('   Check your username and password in .env file');
    } else {
      console.error('❌ Error:', error.message);
    }
    throw error;
  }
}

// Run check
checkDatabase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

