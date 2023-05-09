import { useState } from 'react';
import styled from "@emotion/styled";
import { useQuery } from 'react-query';
import podoDetail from '@/pages/api/podoDetail';

const UserMemoDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  height: 15.5rem;
`;

const UserMemoDateDiv = styled.div`
  font-weight: 900;
  padding-top:0.5rem;
  padding-left:10rem;
`;

export function UserMemo({ podoDetail }: { podoDetail: any }) {
  return (
    <UserMemoDiv>
      <p>{ podoDetail == null ? (""):(podoDetail.oneline)}</p>
      <UserMemoDateDiv>
        <p>{ podoDetail == null ? (""):(podoDetail.createdAt)}</p>
      </UserMemoDateDiv>
    </UserMemoDiv>
  );
}