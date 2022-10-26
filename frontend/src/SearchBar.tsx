import Form from "react-bootstrap/Form";

const SearchBar = () => {
  return (
    <div className="container">
      <Form style={{ width: "33%" }}>
        <Form.Group>
          <Form.Control type="text" placeholder="Search Stock" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
