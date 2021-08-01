import { css } from "@emotion/react";
import { PuffLoader } from "react-spinners/";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Loader = (isLoading) => {
  return (
    <tr>
      <td colSpan={7}>
        <PuffLoader color={"#74B1EF"} css={override} loading={isLoading} size={75} />
      </td>
    </tr>
  );
};
export { override, Loader };
