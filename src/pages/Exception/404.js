import Exception from '../../components/Exception';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

const Exception404 = ()=>(
	<Exception
		type='404'
		linkElement={Link}
		backText={<FormattedMessage id='app.exception.back'/>}
	/>
)


export default Exception404