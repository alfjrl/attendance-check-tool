import { Text, Input, Spacer, Card, Row } from "@nextui-org/react";
import Namelist from "./nameList";
import { useState, useEffect } from "react";
import AttendDisplay from "./statusDisplay/attendaceDisplay";
import useGoogleSheets from "use-google-sheets";

export default function SearchBar() {
  // get name list
  const nameList = Namelist();
  const arrName = Array.from(nameList);

  //   get student attendace record (combine 4 sheets)
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: "AIzaSyAaSUv8o26no0blMnzvIdkoegBjppmfS3s",
    sheetId: "1xI9tH1OFE226_EnWFxWHmnX542QQvyHWx_N6EvDr7yU",
  });

  const combinedList = [];
  const combinedListHandler = () => {
    for (let i = 0; i < data.length; i++) {
      for (let a = 0; a < data[i].data.length; a++) {
        combinedList.push(data[i].data[a]);
      }
    }
  };
  combinedListHandler();

  const [selectedName, setSelectedName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedAttenRecord, setSelectedAttenRecord] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filteredAtten, setFilteredAtten] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = arrName.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleRecord = (name) => {
    console.log("record called");
    const newAttenFilter = combinedList.filter((value) => {
      return value.NAME === name;
    });

    if (name === "") {
      setFilteredAtten([]);
    } else {
      setFilteredAtten(newAttenFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  useEffect(() => {
    setSelectedAttenRecord(filteredAtten);
  }, [filteredAtten]);

  return (
    <div>
      <Input
        clearable
        label="Enter Your Name"
        placeholder={wordEntered === "" ? "Name" : wordEntered}
        type="text"
        width="100%"
        onChange={handleFilter}
      />
      <div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div>
                  <Spacer y={0.5}></Spacer>
                  <Card
                    isHoverable
                    isPressable
                    variant="bordered"
                    css={{ $$cardColor: "$colors$default" }}
                    onPress={() => {
                      handleRecord(value.name);
                      setSelectedName(value.name);
                      setSelectedSection(value.section);
                      clearInput();
                    }}
                  >
                    <Card.Body>
                      <Text h6 size={15} color="default" css={{ m: 0 }}>
                        {value.name}
                      </Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Spacer y={2}></Spacer>
      <AttendDisplay
        {...{ selectedName, selectedSection, selectedAttenRecord }}
      ></AttendDisplay>
    </div>
  );
}
