import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';

// Assertion style
chai.should();
chai.use(chaiHttp);

describe("Articles API", ()=>{
    /**
     * Test the GET route 
    */
    describe("GET /articles", ()=>{
        it("It should return all articles", done =>{
            chai.request(server)
                .get("/articles")
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })
    })

    /**
     * Test the GET { by id } route 
    */
     describe("GET /articles/:id", ()=>{
        it("It should return an article with the given id", done =>{
            const id = "62505a320e68ba765d21665d"
            chai.request(server)
                .get("/articles/" + id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })
        it("It should return nothing", done =>{
            const id = "lorem ipsum"
            chai.request(server)
                .get("/articles/" + id)
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    })


    /**
     * Test POST route 
    */

     describe("POST /articles", ()=>{
        it("It should post a new article", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            chai.request(server)
                .post("/articles")
                .send(article)
                .end((err, response)=>{
                    response.should.have.status(201);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })
    })







})