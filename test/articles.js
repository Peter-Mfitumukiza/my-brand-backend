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
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .post("/articles")
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(201);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })

        it("It should not post a new article with errors", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .post("/articles")
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not post a new article with invalid token", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            const token ="Bearer loremIpsum.yJfaWQiOiI2MjVmZDwewiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .post("/articles")
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not post a new article without a token", done =>{
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
                    response.should.have.status(401);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    })

    /**
     * Test PATCH route 
    */

    describe("PATCH /articles/:id", ()=>{
        it("It should update an existing article", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            const id = "625fdc5a049ac094065e3cd2";
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/" + id)
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })

        it("It should not update an article with errors", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "random uri",
                publish: false,
                enableComments: false
            };
            const id = "625febf9a10c8a1571750f8d";
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/" + id)
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not update an article which doesn't exist", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/image.png",
                publish: false,
                enableComments: false
            };
            const id = "randomid";
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/" + id)
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not update an article without a token", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            const id = "625febf9a10c8a1571750f8d";
            chai.request(server)
                .patch("/articles/" + id)
                .send(article)
                .end((err, response)=>{
                    response.should.have.status(401);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
        it("It should not update an article with invalid token", done =>{
            const article = {
                title: "Testing title",
                description: "Lorem Ipsum doret amet is the only one I remember",
                content: "Maybe again I will have to depend on the famous lorem ipsum doret amet. Maybe again I will have to depend on the famous lorem ipsum doret amet. ",
                cover: "http://random.com/my_image.png",
                publish: false,
                enableComments: false
            };
            const id = "625febf9a10c8a1571750f8d";
            const token ="Bearer loremIpsum.yJfaWQiOiI2MjVmZDwewiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/" + id)
                .send(article)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    });


    /**
     * Test PATCH route 
    */

    describe("PATCH /articles/comment", ()=>{
        it("It should comment on an existing article", done =>{
            const comment = {
                content: "That was a great one.",
                articleId: "625fdc5a049ac094065e3cd2"
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/comment")
                .send(comment)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })

        it("It should not comment with errors", done =>{
            const comment = {
                content: "That was a great one.",
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/comment")
                .send(comment)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not comment on an article which doesn't exist", done =>{
            const comment = {
                content: "That was a great one.",
                articleId: "625fdc5a049ac094065e3ran"
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/comment")
                .send(comment)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not comment on an article without a token", done =>{
            const comment = {
                content: "That was a great one.",
                articleId: "625fdc5a049ac094065e3cd2"
            };
            chai.request(server)
                .patch("/articles/comment")
                .send(comment)
                .end((err, response)=>{
                    response.should.have.status(401);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
        it("It should not comment on an article with invalid token", done =>{
            const comment = {
                content: "That was a great one.",
                articleId: "625fdc5a049ac094065e3cd2"
            };
            const token ="Bearer loremIpsum.yJfaWQiOiI2MjVmZDwewiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/comment")
                .send(comment)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    });    

    /**
     * Test PATCH route 
    */

    describe("PATCH /articles/like", ()=>{
        it("It should like an article", done =>{
            const like = {
                articleId: "625fdc5a049ac094065e3cd2"
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/like")
                .send(like)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.should.be.a("object");
                    response.body.should.have.property("data");
                    response.body.should.have.property("status").eq("success");
                done();    
                })
        })

        it("It should not like without article id", done =>{
            const like = { };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/like")
                .send(like)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not like an article which doesn't exist", done =>{
            const like = {
                articleId: "625fdc5a049ac094065e3rans"
            };
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/like")
                .send(like)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not like an article without a token", done =>{
            const like = {
                articleId: "625fdc5a049ac094065e3cd2"
            };
            chai.request(server)
                .patch("/articles/like")
                .send(like)
                .end((err, response)=>{
                    response.should.have.status(401);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
        it("It should not like an article with invalid token", done =>{
            const like = {
                articleId: "625fdc5a049ac094065e3cd2"
            };
            const token ="Bearer loremIpsum.yJfaWQiOiI2MjVmZDwewiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .patch("/articles/like")
                .send(like)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    });    


    /**
     * Test DELETE route 
    */

    describe("DELETE /articles/:id", ()=>{
        // it("It should delete an existing article", done =>{
        //     const id = "625fda304733665ef5c7d9a5";
        //     const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
        //     chai.request(server)
        //         .delete("/articles/" + id)
        //         .set({ Authorization: `${token}` })
        //         .end((err, response)=>{
        //             response.should.have.status(200);
        //             response.should.be.a("object");
        //             response.body.should.have.property("message");
        //             response.body.should.have.property("status").eq("success");
        //         done();    
        //         })
        // })

        it("It should not delete an article which doesn't exist", done =>{
            const id = "randomid";
            const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmZDgxNDgwZmZiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .delete("/articles/" + id)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })

        it("It should not delete an article without a token", done =>{
            const id = "625febf9a10c8a1571750f8d";
            chai.request(server)
                .delete("/articles/" + id)
                .end((err, response)=>{
                    response.should.have.status(401);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
        it("It should not delete an article with invalid token", done =>{
            const id = "625febf9a10c8a1571750f8d";
            const token ="Bearer loremIpsum.yJfaWQiOiI2MjVmZDwewiNTNlOGRlZmU0ZmQiLCJuYW1lIjoiTWZpdHVtdWtpemEgUGV0ZXIiLCJlbWFpbCI6InJhbmRvbUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vcmFuZG9tLWltYWdlL2ltYWdlLnBuZyIsImlhdCI6MTY1MDQ0ODQyMn0.q4ZjsX9RWhPsLa6BsvmrfwuHkh3qlCwa2XZJdJr9WUg"
            chai.request(server)
                .delete("/articles/" + id)
                .set({ Authorization: `${token}` })
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.should.be.a("object");
                    response.body.should.have.property("status").eq("error");
                    response.body.should.have.property("message");
                done();    
                })
        })
    });

})