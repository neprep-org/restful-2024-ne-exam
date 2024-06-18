const generateColumns = () => {
  return [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Author", accessor: "author" },
    { Header: "Publisher", accessor: "publisher" },
    { Header: "PublicationYear", accessor: "publicationYear" },
    { Header: "Subject", accessor: "subject" },
    { Header: "Count", accessor: "count" },
    // { Header: "Created At", accessor: "createdAt" },
  ];
};

const columns = generateColumns();

export { columns };
