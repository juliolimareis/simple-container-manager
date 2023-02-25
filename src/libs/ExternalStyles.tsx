import React, { Global, } from "@emotion/react";

const ExternalStyles = (): JSX.Element => {
  return (
    <Global
      styles={`
				@import url("http://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:wght@300;700&display=swap");
			`}
    />
  );
};

export default ExternalStyles;