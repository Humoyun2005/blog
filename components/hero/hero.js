import "react-multi-carousel/lib/styles.css";
import { Avatar, Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { format } from "date-fns";

import { useRouter } from "next/router";
import { calculateEstimatedTimeToRead } from "@/helper/time.format";

const Hero = ({ blogs }) => {
  const router = useRouter();

  return (
    <Box width={"100%"} height={"70vh"}>
      <Carousel
        infinite
        autoPlay
        autoPlaySpeed={5000}
        responsive={{
          mobile: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
          },
        }}
      >
        {blogs.map((item) => (
          <Box
            key={item.id}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/blog/${item.slug}`)}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "70vh",
                paddingX: 2,
              }}
            >
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, .6)",
                }}
              />

              <Box
                width={{ xs: "100%", md: "70%" }}
                position={"relative"}
                color={"white"}
                sx={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  paddingLeft: { xs: "10px", md: "50px" },
                }}
                zIndex={999}
              >
                <Typography sx={{ fontSize: { xs: "30px", md: "50px" } }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "20px", md: "25px", opacity: ".6" } }}
                >
                  {item.excerpt.length > 5
                    ? `${item.excerpt.slice(0, 90)}...`
                    : item.excerpt}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt={item.author.name} src={item.author.avatar.url} />
                  <Box>
                    <Typography>{item.author.name}</Typography>
                    <Box>
                      {format(new Date(item.createdAt), "dd MMM, yyyy")}{" "}
                      &#x2022;{" "}
                      {calculateEstimatedTimeToRead(item.description.text)} min
                      ago
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
export default Hero;
