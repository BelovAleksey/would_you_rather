import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="page404">
      <h2>Error 404. This Page Could Not Be Found</h2>
      <Link className="link" to="/">
        Back
      </Link>
    </div>
  );
}
