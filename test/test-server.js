const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();
const app = require('../server');

chai.use(chaiHTTP);

describe('Testing api-routes', function(){
    it('Should return something from the /api/login', function(done){
        chai.request(app)
            .get('/api/login')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                res.text.should.equal('this is an API call for login');
                done();
            });
    });
    it('Should return something different from the /api/signup', function(done){
        chai.request(app)
            .get('/api/signup')
            .end(function(err, res){
                res.should.be.html;
                res.status.should.equal(200);
                res.text.should.equal('this is an API call for signup');
                done();
        });
    });
});
