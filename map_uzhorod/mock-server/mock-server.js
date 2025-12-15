const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockCommunity = [
  {
    id: 1,
    name: 'Sample Community 1',
    slug: 'sample-community-1',
    description: 'A sample community',
    location: { lat: 47.3769, lng: 8.5417 },
    region: 'Zurich'
  },
  {
    id: 2,
    name: 'Sample Community 2',
    slug: 'sample-community-2',
    description: 'Another sample community',
    location: { lat: 47.3770, lng: 8.5418 },
    region: 'Zurich'
  }
];

const mockProblems = [
  {
    id: 1,
    title: 'Sample Problem 1',
    slug: 'sample-problem-1',
    description: 'A sample problem description',
    communityId: 1
  },
  {
    id: 2,
    title: 'Sample Problem 2',
    slug: 'sample-problem-2',
    description: 'Another sample problem',
    communityId: 1
  }
];

const mockSolutions = [
  {
    id: 1,
    title: 'Sample Solution 1',
    slug: 'sample-solution-1',
    description: 'A sample solution description',
    problemId: 1
  },
  {
    id: 2,
    title: 'Sample Solution 2',
    slug: 'sample-solution-2',
    description: 'Another sample solution',
    problemId: 1
  }
];

// Helper function to generate mock stats
const generateStats = () => ({
  views: Math.floor(Math.random() * 1000),
  likes: Math.floor(Math.random() * 100),
  shares: Math.floor(Math.random() * 50)
});

// API Routes
const router = express.Router();

// Community routes
router.get('/v1/community', (req, res) => {
  const { search, region } = req.query;
  let filtered = [...mockCommunity];
  
  if (search) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (region) {
    filtered = filtered.filter(c => c.region === region);
  }
  
  res.json(filtered);
});

router.get('/v1/community/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const community = mockCommunity.find(c => c.id === id);
  
  if (!community) {
    return res.status(404).json({ error: 'Community not found' });
  }
  
  res.json(community);
});

router.get('/v1/community/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const community = mockCommunity.find(c => c.slug === slug);
  
  if (!community) {
    return res.status(404).json({ error: 'Community not found' });
  }
  
  res.json(community);
});

router.get('/v1/community/:id/stats', (req, res) => {
  res.json(generateStats());
});

router.get('/v1/community/:id/problems', (req, res) => {
  const id = parseInt(req.params.id);
  const problems = mockProblems.filter(p => p.communityId === id);
  res.json(problems);
});

router.get('/v1/community/:id/solutions', (req, res) => {
  const id = parseInt(req.params.id);
  const communityProblems = mockProblems
    .filter(p => p.communityId === id)
    .map(p => p.id);
  const solutions = mockSolutions.filter(s => 
    communityProblems.includes(s.problemId)
  );
  res.json(solutions);
});

router.get('/v1/community/:id/community', (req, res) => {
  const id = parseInt(req.params.id);
  const community = mockCommunity.find(c => c.id === id);
  
  if (!community) {
    return res.status(404).json({ error: 'Community not found' });
  }
  
  res.json(community);
});

// Problem routes
router.get('/v1/problems', (req, res) => {
  res.json(mockProblems);
});

router.get('/v1/problems/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const problem = mockProblems.find(p => p.id === id);
  
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  
  res.json(problem);
});

router.get('/v1/problems/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const problem = mockProblems.find(p => p.slug === slug);
  
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  
  res.json(problem);
});

router.get('/v1/problems/:id/stats', (req, res) => {
  res.json(generateStats());
});

router.get('/v1/problems/:id/solutions', (req, res) => {
  const id = parseInt(req.params.id);
  const solutions = mockSolutions.filter(s => s.problemId === id);
  res.json(solutions);
});

router.get('/v1/problems/:id/community', (req, res) => {
  const id = parseInt(req.params.id);
  const problem = mockProblems.find(p => p.id === id);
  
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  
  const community = mockCommunity.find(c => c.id === problem.communityId);
  res.json(community || {});
});

// Solution routes
router.get('/v1/solutions', (req, res) => {
  res.json(mockSolutions);
});

router.get('/v1/solutions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const solution = mockSolutions.find(s => s.id === id);
  
  if (!solution) {
    return res.status(404).json({ error: 'Solution not found' });
  }
  
  res.json(solution);
});

router.get('/v1/solutions/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const solution = mockSolutions.find(s => s.slug === slug);
  
  if (!solution) {
    return res.status(404).json({ error: 'Solution not found' });
  }
  
  res.json(solution);
});

router.get('/v1/solutions/:id/stats', (req, res) => {
  res.json(generateStats());
});

router.get('/v1/solutions/:id/community', (req, res) => {
  const id = parseInt(req.params.id);
  const solution = mockSolutions.find(s => s.id === id);
  
  if (!solution) {
    return res.status(404).json({ error: 'Solution not found' });
  }
  
  const problem = mockProblems.find(p => p.id === solution.problemId);
  if (!problem) {
    return res.json({});
  }
  
  const community = mockCommunity.find(c => c.id === problem.communityId);
  res.json(community || {});
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock server is running' });
});

app.use('/api', router);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

