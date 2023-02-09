import useGoogleSheets from "use-google-sheets";

const Namelist = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyAaSUv8o26no0blMnzvIdkoegBjppmfS3s",
    sheetId: "15wcC11DgQ9Lhkb3UpviTrW8abKDjNvMeImSWMMUz_zQ",
    sheetsOptions: [{ id: "list" }],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }
  return data[0].data;
};

export default Namelist;
