import { findPostAuthor } from "../utils/findPostAuthor";

describe("findPostAuthor", () => {
  test("should find correct post's author", () => {
    const postMock = {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    };
    const authorsMock = [
      {
        address: {
          city: "Warsaw",
          geo: { lat: "1", lng: "1" },
          street: "street",
          suite: "suite",
          zipcode: "zipcode",
        },
        company: {
          bs: "foo",
          catchPhrase: "bar",
          name: "companyName",
        },
        email: "foo@bar",
        id: 1,
        name: "Name",
        phone: "123",
        username: "User name",
        website: "website.com",
      },
      {
        address: {
          city: "London",
          geo: { lat: "1", lng: "1" },
          street: "street",
          suite: "suite",
          zipcode: "zipcode",
        },
        company: {
          bs: "foo",
          catchPhrase: "bar",
          name: "companyName",
        },
        email: "foo@bar",
        id: 2,
        name: "Name",
        phone: "123",
        username: "User name",
        website: "website.com",
      },
    ];
    const author = findPostAuthor(postMock, authorsMock);
    expect(author).toEqual(authorsMock[0]);
  });
});
