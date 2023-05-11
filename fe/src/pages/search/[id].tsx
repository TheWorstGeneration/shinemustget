import { useEffect } from 'react';
import { useRouter } from 'next/router';
import searchDetail from '../api/searchDetail';

const SearchDetail = () => {
  const router = useRouter();
  const { id }:any = router.query;

  useEffect(() => { searchDetail(id).then((res) => { console.log(res) }) });

  return (
    <div>
      <p>Detail page for ID: {id}</p>
    </div>
  );
};

export default SearchDetail;