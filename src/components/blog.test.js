import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const handleLike = jest.fn();
  beforeEach(() => {
    const blogContent = {
      title: "test blog",
      author: "tester",
      likes: 0,
      url: "www.test.com",
      user: {
        name: "JEST",
        username: "JESTTEST",
        id: "dkfjhghdjsdfhgdj",
      },
    };
    container = render(
      <Blog
        blog={blogContent}
        user={{ id: "dkfjhghdjsdfhgdj" }}
        handleLike={handleLike}
      />
    ).container;
  });
  test("displays only title and author by default", () => {
    const blogHeaderDiv = container.querySelector(".blogHeader");
    const togglableDiv = container.querySelector("#togglable");

    expect(blogHeaderDiv).toHaveTextContent("test blog - tester");
    expect(togglableDiv).toHaveStyle("display:none");
  });

  test("shows the URL and likes when the user clicks view btn", async () => {
    const togglableDiv = container.querySelector("#togglable");
    const user = userEvent.setup();
    const viewBtn = container.querySelector(".viewBtn");
    await user.click(viewBtn);

    expect(togglableDiv).not.toHaveStyle("display: none");
  });

  test("recieves the handleLike props twice when user clicks like twice", async () => {
    const viewBtn = container.querySelector("#viewBtn");
    const likeBtn = container.querySelector("#likeBtn");
    const user = userEvent.setup();
    await user.click(viewBtn);
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});

// likes: blogObj.likes,
// author: blogObj.author,
// title: blogObj.title,
// url: blogObj.url,
