import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import MainLayout from "./layout/Main";

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    flipReason: "",
    flipCount: 1,
    player1Username: "",
  });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateGameSession = async () => {
    console.log(formData);
    navigate("/83jd3d");
  };

  return (
    <MainLayout>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Grid onSubmit={handleCreateGameSession} rowGap={4} as="form">
          <FormControl>
            <FormLabel>What are you flipping for?</FormLabel>
            <Input
              type="text"
              name="flipReason"
              value={formData.flipReason}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Number of coin flips required?</FormLabel>
            <Input
              type="number"
              min={1}
              max={5}
              name="flipCount"
              value={formData.flipCount}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Enter a username for this session</FormLabel>
            <Input
              type="text"
              required
              name={"player1Username"}
              value={formData.player1Username}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button type="submit">Create Game Session</Button>
        </Grid>
      </Flex>
    </MainLayout>
  );
}

export default App;
