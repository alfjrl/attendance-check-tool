import Head from "next/head";
import {
  Container,
  Card,
  Row,
  Text,
  Spacer,
  Badge,
  Input,
} from "@nextui-org/react";

import SearchBar from "components/searchBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>23 Spring INST201 Attendance</title>
        <meta
          name="23 Spring INST201 Attendance"
          content="Made by Alfred J. Lin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sm justify={"flex-end"} display={"block"}>
          <Spacer css={{ height: "10vh" }} />
          <Badge isSquared color="primary" variant="flat">
            2023 Spring
          </Badge>
          <Text h2>INST201 Attendance Status</Text>
          <Spacer y={1} />
          <Text>
            By entering your name, you could query your INST201 attendance
            record. If you have any questions regarding the record, please reach
            out to TAs.
          </Text>
          <Spacer y={2} />
          <SearchBar></SearchBar>
          <Spacer css={{ height: "10vh" }} />
        </Container>
      </main>
    </>
  );
}
