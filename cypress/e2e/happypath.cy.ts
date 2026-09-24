describe("E2E Test Create Plan", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/es/auth/login")
        cy.get("#email").type("t.sierras@uniandes.edu.co")
        cy.get("#password").type("123")
        cy.get("button[type=submit]").click()
        cy.url().should("include", "/es/plans")
    })

    it("Can create a new plan", () => {
        cy.get("#create-plan-link").click()
        cy.url().should("include", "/es/plans/create-plan")
        cy.get("#picture").type("https://example.com/image.jpg")
        cy.get("#planName").type("Plan de prueba")
        cy.get("#address").type("Calle 123")
        cy.get("#price").type("100")
        cy.get("#duration").type("30")
        cy.get("#description").type("Descripción del plan de prueba")
        cy.get("#recomendations").type("Recomendaciones del plan de prueba")
        cy.get("button[type=submit]").click()
        cy.url().should("include", "/es/plans")
    })
})
