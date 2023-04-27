import styled from "@emotion/styled";
import Image from "next/image";

export default function GrapeBoard() {
  const ImageContainer = styled.div`
  `;
  return (
    <>
      <ImageContainer>
        <Image
        src="/assets/images/grapeBoard/grape_board.png"
        width={325}
        height={400}
        alt="image"
      ></Image>
      </ImageContainer>
    </>
  );
}