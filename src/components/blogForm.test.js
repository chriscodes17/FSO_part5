import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("<CreateBlogForm", () => {
  test("calls the handleBlogPost fn with the right details", async () => {
    const handleBlogPost = jest.fn();
    const { container } = render(<CreateBlogForm handleBlogPost={handleBlogPost} />);
    const titleInput = container.querySelector("#blogTitle");
    const authorInput = container.querySelector("#blogAuthor");
    const urlInput = container.querySelector("#blogUrl");
    const createBtn = container.querySelector("#createBtn");
    const user = userEvent.setup();
    await user.type(titleInput, "title");
    await user.type(authorInput, "author");
    await user.type(urlInput, "url");
    await user.click(createBtn);

    expect(handleBlogPost.mock.calls).toHaveLength(1);
    expect(handleBlogPost.mock.calls[0][0].title).toContain("title");
    expect(handleBlogPost.mock.calls[0][0].author).toContain("author");
    expect(handleBlogPost.mock.calls[0][0].url).toContain("url");
  });
});
