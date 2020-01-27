const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();
const app = require('../server');

chai.use(chaiHTTP);

describe('Testing api-routes', function(){
    it('Should fail authentication for invalid user in the /api/login', function(done){
        chai.request(app)
            .post('/api/login')
            .send({username: 'invalidTest@gmail.com',
                password: '12345'})
            .end(function(err, res){
                res.status.should.equal(401);
                done();
            });
    });
    it('Should authenticate valid user in the /api/login', function(done){
        chai.request(app)
            .post('/api/login')
            .send({username: 'kvTest1@gmail.com',
                password: 'Password1'})
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            });
    });
    it('Should return an error if the user already exists in the /api/signup', function(done){
        chai.request(app)
            .post('/api/signup')
            .send({firstName: 'Kirill', lastName: 'TEST', email: 'kvTest1@gmail.com', password: '12345'})
            .end(function(err, res){
                res.status.should.equal(400);
                res.text.should.equal('ERROR: User with this email already exists');
                done();
        });
    });
    it('Should search for restaurants nearby by term', function(done){
        chai.request(app)
            .post('/api/search/restaurantsNearby')
            .send({lat: 43.778290, lon: -79.413517, radius: 1000, term: 'Korean'})
            .end(function(err, res){
                //console.log(res.data);
                res.should.be.html;
                done();
            });
    });
    it('Should return a bucketlist for a user', function(done){
        chai.request(app)
            .get('/api/users/buckeatlist')
            .end(function(err, res){
                //console.log(res.data);
                res.should.be.html;
                done();
            });
    });
});


describe('Testing html-routes', function(){
    it('Should return html from the /login', function(done){
        chai.request(app)
            .get('/login')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                //res.text.should.equal('this is an API call for login');
                done();
            });
    });
    it('Should return html from the /signup', function(done){
        chai.request(app)
            .get('/signup')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                //res.text.should.equal('this is an API call for signup');
                done();
        });
    });
    it('Should return html from the /home', function(done){
        chai.request(app)
            .get('/signup')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                //res.text.should.equal('this is an API call for signup');
                done();
        });
    });
    it('Should return html from the /search', function(done){
        chai.request(app)
            .get('/signup')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                //res.text.should.equal('this is an API call for signup');
                done();
        });
    });
});