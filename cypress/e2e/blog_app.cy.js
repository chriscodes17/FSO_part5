describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "cj17",
      name: "chris",
      password: "1234",
    };
    const user2 = {
      username: "leo",
      name: "leo cat",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.request("POST", "http://localhost:3001/api/users", user2);
    cy.visit("http://localhost:3000");
  });
  it("shows login form by default", function () {
    cy.get("h2").contains("Login");
    cy.contains("username");
    cy.contains("password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("cj17");
      cy.get("#password-input").type("1234");
      cy.get("#login-btn").click();

      cy.contains("Blogs - Welcome chris");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("dsfdsf");
      cy.get("#password-input").type("fadfaf");
      cy.get("#login-btn").click();

      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("when user is logged in", function () {
    beforeEach(function () {
      cy.login({ username: "cj17", password: "1234" });
    });

    it("can create a new blog", function () {
      cy.contains("New blog").click();
      cy.get("#blogTitle").type("new blog!");
      cy.get("#blogAuthor").type("Tester Lester");
      cy.get("#blogUrl").type("www.cypress.com");
      cy.get("#createBtn").click();

      cy.contains("new blog! - Tester Lester");
    });
    describe("and there is an existing post", function () {
      beforeEach(function () {
        cy.newBlog({ title: "a new blog", author: "tester", url: "cypress.com" });
      });
      it("can like the existing post", function () {
        cy.contains("view").click();
        cy.get("#likeBtn").click();
        cy.get("#likesText").contains("1");
      });
    });
  });
  describe("when 2 different users are logged in", function () {
    beforeEach(function () {
      cy.login({ username: "leo", password: "1234" });
      cy.newBlog({ title: "cats are cool", author: "meow", url: "www.catblogs.com" });
      cy.login({ username: "cj17", password: "1234" });
      cy.newBlog({ title: "cypress testing", author: "cypress", url: "www.cypress.com" });
    });
    it("only the creator of a post can see the delete button", function () {
      cy.contains("cypress testing - cypress").parent().find(".viewBtn").click();
      cy.contains("Delete").click();
      cy.contains("cypress testing - cypress").should("not.exist");
    });
  });
  describe("when there are multiple blogs", function () {
    beforeEach(function () {
      cy.login({ username: "cj17", password: "1234" });
      //backend api for blog posts can take in a like value for testing -  likes: likes || 0
      cy.newBlog({ title: "second", author: "tester", url: "test.com", likes: "25" });
      cy.newBlog({ title: "third", author: "tester", url: "test.com", likes: "2" });
      cy.newBlog({ title: "first", author: "tester", url: "test.com", likes: "50" });
    });
    it.only("blogs are ordered by likes, blog with most likes is first", function () {
      cy.get(".blog").eq(0).should("contain", "first - tester");
      cy.get(".blog").eq(1).should("contain", "second - tester");
      cy.get(".blog").eq(2).should("contain", "third - tester");
    });
  });
});
