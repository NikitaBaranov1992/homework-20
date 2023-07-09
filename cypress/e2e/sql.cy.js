describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("Input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
              (1, "Ivan", "02-2022", "Barselona"),
              (2, "Maria", "03-2022", "Tokio"),
              (3, "Andrey", "02-2023", "Milan")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it("Input entries 2", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
              (4, "Nikita", "02-2022", "Ufa"),
              (5, "Anatole", "02-2024", "Moscow")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Andrey");
    });
  });

  it("select 2", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE StudentGroup="02-2024"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Anatole");
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", `DROP TABLE Students`);
  });
});
