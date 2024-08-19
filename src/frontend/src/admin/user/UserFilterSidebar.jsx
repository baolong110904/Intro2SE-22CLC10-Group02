import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TransgenderIcon from '@mui/icons-material/Transgender';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const UserFilterSidebar = () => {
	return (
		<Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
			<CardContent>
					<SavedQueriesList />
					{/* <FilterLiveSearch /> */}
					<FilterList label="Gender" icon={<TransgenderIcon />}>
						<FilterListItem label="Male" value={{ gender: "Male" }} />
						<FilterListItem label="Female" value={{ gender: "Female" }} />
						<FilterListItem label="Other" value={{ gender: "Other" }} />
					</FilterList>
					<FilterList label="Status" icon={<VisibilityIcon />}>
						<FilterListItem label="Enabled" value={{ isEnabled: true }} />
						<FilterListItem label="Disabled" value={{ isEnabled: false }} />
					</FilterList>
					<FilterList label="Role" icon={<VerifiedUserIcon />}>
						<FilterListItem label="Admin" value={{ roles: { name: "ADMIN" } }} />
						<FilterListItem label="Student" value={{ roles: { name: "STUDENT" } }} />
						<FilterListItem label="Teacher" value={{ roles: { name: "TEACHER" } }} />
					</FilterList>
					{/* <FilterList label="Last Visited" icon={<AccessTimeIcon />}>

					</FilterList> */}
			</CardContent>
		</Card>
	);
};