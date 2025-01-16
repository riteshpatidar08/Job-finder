import React from 'react';
import { Avatar } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';
import { LogOut, User ,BriefcaseBusiness} from 'lucide-react';
function ProfileDropdown({role}) {

    const renderRoleBasedItems = (role) => {
        if(role==='recruiter'){
            return <Menu.Item leftSection={<BriefcaseBusiness size={16}/>}>My Job Posts</Menu.Item>
        }
        if(role==='jobseeker'){
            return <Menu.Item leftSection={<BriefcaseBusiness size={16}/>}>My Applications</Menu.Item>
        }
    }
  return (
    <div>
      <Menu shadow="md" width={150}>
        <Menu.Target>
          <Avatar style={{cursor : 'pointer'}} color="cyan" radius="xl">
            MK
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<User size={16} />}>Profile</Menu.Item>
          {renderRoleBasedItems(role)}
          <Menu.Item leftSection={<LogOut size={16} />} color="red">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default ProfileDropdown;
