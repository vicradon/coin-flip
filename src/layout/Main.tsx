import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid gridTemplateRows={"10vh 65vh"}>
      <Flex>
        <Link to="/">
          <Heading fontWeight={"regular"}>CoinFlip</Heading>
        </Link>
      </Flex>

      <Box>{children}</Box>
    </Grid>
  );
}

export default MainLayout;
