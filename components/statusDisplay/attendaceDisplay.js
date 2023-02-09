import useGoogleSheets from "use-google-sheets";
import {
  Loading,
  Container,
  Row,
  Text,
  Table,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const AttendDisplay = ({
  selectedName,
  selectedSection,
  selectedAttenRecord,
}) => {
  //   get date
  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyAaSUv8o26no0blMnzvIdkoegBjppmfS3s",
    sheetId: "15wcC11DgQ9Lhkb3UpviTrW8abKDjNvMeImSWMMUz_zQ",
    sheetsOptions: [{ id: "date" }],
  });

  const rawDate = data;
  const tableList = [];

  const date = [];

  const dateHandler = () => {
    for (let i = 0; i < rawDate.length; i++) {
      for (let a = 0; a < rawDate[i].data.length; a++) {
        date.push(rawDate[i].data[a]);
      }
    }
  };
  dateHandler();

  const arryLoopUp = (obj) => {
    const datapoint = [];
    for (let i = 0; i < obj.length; i++) {
      for (let a = 0; a < obj[i].length; a++) {
        datapoint.push(obj[i][a]);
      }
    }
    return datapoint;
  };

  const statusHandler = () => {
    const attendedCheck = selectedAttenRecord.map((item) => {
      return Object.keys(item).filter(
        (key) => item[key].toLowerCase() === "yes"
      );
    });
    const attended = arryLoopUp(attendedCheck);
    const lateCheck = selectedAttenRecord.map((item) => {
      return Object.keys(item).filter(
        (key) => item[key].toLowerCase() === "late"
      );
    });
    const late = arryLoopUp(lateCheck);
    const excusedCheck = selectedAttenRecord.map((item) => {
      return Object.keys(item).filter(
        (key) => item[key].toLowerCase() === "excused"
      );
    });
    const excused = arryLoopUp(excusedCheck);

    for (let i = 0; i < date.length; i++) {
      date[i].key = date[i].week_no;
      date[i].status = "";
      console.log("initial status");
      for (let a = 0; a < attended.length; a++) {
        if (date[i].week_no === attended[a]) {
          date[i].status = (
            <Tooltip placement="right" content="Present" color="primary">
              <CheckIcon color="primary"></CheckIcon>
            </Tooltip>
          );
          console.log("set showed up");
        }
      }
      for (let a = 0; a < late.length; a++) {
        if (date[i].week_no === late[a]) {
          date[i].status = (
            <Tooltip placement="right" content="Late" color="warning">
              <WatchLaterIcon color="warning"></WatchLaterIcon>
            </Tooltip>
          );
          console.log("set late");
        }
      }
      for (let a = 0; a < excused.length; a++) {
        if (date[i].week_no === excused[a]) {
          date[i].status = (
            <Tooltip placement="right" content="Excused" color="warning">
              <ChangeHistoryIcon color="warning"></ChangeHistoryIcon>
            </Tooltip>
          );
          console.log("set excused");
        }
      }
      if (date[i].status === "") {
        console.log("set absense");
        date[i].status = (
          <Tooltip placement="right" content="Absent" color="error">
            <CloseIcon color="error"></CloseIcon>
          </Tooltip>
        );
      }
      console.log(date);
    }
    date.forEach((data) =>
      tableList.push(
        <Table.Row key={data.key}>
          <Table.Cell>{data.date}</Table.Cell>
          <Table.Cell>{data.status}</Table.Cell>
        </Table.Row>
      )
    );
  };
  statusHandler();

  if (loading) {
    return (
      <div>
        <Container>
          <Row justify="center">
            <Loading></Loading>
          </Row>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Container>
          <Row justify="center">
            <Loading color="error" textColor="error"></Loading>
            <Text color="error">Data Fetching Error</Text>
          </Row>
        </Container>
      </div>
    );
  }

  if (!selectedName == "") {
    console.log("before render", data);
    return (
      <div>
        <Text h3>{selectedName}</Text>
        <Text>INST201 - {selectedSection}</Text>
        <Spacer y={0.5}></Spacer>

        <Table
          aria-label="Attendance Status"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>Date</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>{tableList}</Table.Body>
        </Table>
      </div>
    );
  }
  return;
};

export default AttendDisplay;
