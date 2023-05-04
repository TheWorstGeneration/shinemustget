import { InputBox } from '@/components/atoms/InputBox/InputBox';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState } from 'react';

const CreateSection = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: calc(100vh - 5.5rem);
  background-color: #ffffff;

  padding: 1rem 0;
`;

export default function Create() {
  return (
    <>
      <Head>
        <title>Shine must get | 만다라트 생성</title>
        <meta
          name="description"
          content="최종 목표를 작성하고 당신만의 만다라트를 생성해 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 만다라드 생성 " />
        <meta property="og:description" />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <CreateSection>
        <InputBox />
      </CreateSection>
    </>
  );
}
