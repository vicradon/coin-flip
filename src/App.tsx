import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import MainLayout from "./layout/Main";
import http from "./services/http";

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flipReason: "",
    player1Username: "",
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const toast = useToast();

  const handleCreateGameSession = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await http.post("CreateGameSession", {
        player1Username: formData.player1Username,
        flip_reason: formData.flipReason,
      });

      localStorage.setItem("is_player_one", "1");

      navigate(data.gamecode);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      toast({
        status: "error",
        title: `An error occured: ${errorMessage}`,
      });
    }
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
