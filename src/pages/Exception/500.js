import Exception from '../../components/Exception';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

const Exception500 = ()=>(
	<Exception
		type='500'
		linkElement={Link}
		backText={<FormattedMessage id='app.exception.back'/>}
	/>
)


export default Exception500