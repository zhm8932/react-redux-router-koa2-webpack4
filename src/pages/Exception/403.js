import Exception from '../../components/Exception';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
const Exception403 =()=>(
	<Exception
		type='403'
		linkElement={Link}
		desc={<FormattedMessage id='app.exception.description.403'/>}
		backText={<FormattedMessage id='app.exception.back'/>}
	/>
)
export default Exception403
