import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';

import { BlogComponent } from '..';

describe("Blog Component", () => {
  let component;
  beforeAll(() => {
    component = shallow(
      <MemoryRouter initialEntries={["/posts/6163e2f80274ee9b2b105e15"]}>
        <Route path="posts/:id">
            <BlogComponent match={null} />
        </Route>
      </MemoryRouter>
    );
  });

  it("Should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("Should render blog body", () => {
    expect(component.find('.blog-body')).not.toBeNull();
  });
});
