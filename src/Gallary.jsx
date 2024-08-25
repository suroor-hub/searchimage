import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

console.log(import.meta.env.VITE_API_KEY);
const Gallary = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h2>Loading....</h2>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h1>There is an error</h1>
      </section>
    );
  }
  const result = response.data.results;
  if (result.length < 1) {
    return (
      <section className="image-container">
        <h1>No result found</h1>
      </section>
    );
  }
  console.log(result);
  return (
    <section className="image-container">
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};
export default Gallary;
