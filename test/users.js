import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';

// Assertion style
chai.should();
chai.use(chaiHttp);