import 'bootstrap/dist/css/bootstrap.min.css';
// import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// function Example()  {
//     return (
//       <div class="alert alert-danger alert-dismissible fade show" role="alert">
//         <strong>Oh snap! You got an error!</strong>
//         <p>
//           Change this and that and try again.
//         </p>
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//     )
// }

function SearchComponent() {
    return (
      <Stack direction="horizontal" gap={3}>
        <Form.Control className="me-auto" placeholder="Add your item here..." />
        <Button variant="secondary">Submit</Button>
      </Stack>
    );
}

function NavBar() {
    return (
        <SearchComponent />
    );
}
  
// export default Example;
export default NavBar;