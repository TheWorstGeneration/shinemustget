import styled from "@emotion/styled";
import Image from "next/image";


export default function GrapeBoard() {
  const ImageContainer = styled.div`
  `;

  const GrapeContainer = styled.div`
      margin-bottom:16rem;
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