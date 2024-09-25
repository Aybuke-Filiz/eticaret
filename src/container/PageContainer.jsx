
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';

function PageContainer( {children}) {
  return (  
    <Container maxWidth="lg">{children}</Container>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default PageContainer