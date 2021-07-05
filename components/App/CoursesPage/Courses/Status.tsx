import React, { useEffect, useMemo, useState } from 'react';

import { DropdownType, Dropdown } from '@/components/common/Dropdown/Dropdown';
import { CoursesAPI } from '@/api/app/courses';
import { CourseI, CourseStatus } from '@/types/courses';
import { showAlert } from '@/utils/network';

import cls from './Course.module.scss';
import { getStatusColor, statuses, statusesMap } from './helpers';

type Props = {
  course: CourseI;
};

export const Status: React.FC<Props> = ({ course }) => {
  const [status, setStatus] = useState<CourseStatus>(course.status);
  const [statusUI, setStatusUI] = useState<DropdownType>();

  useEffect(() => {
    if (status) setStatusUI(statusesMap[status]);
  }, [status]);

  const statusColor = useMemo(() => {
    const statusID = statusUI?.id as CourseStatus | undefined;
    return getStatusColor(statusID);
  }, [statusUI]);

  const [isLoading, setLoading] = useState(false);
  const onStatusChange = async (v: DropdownType) => {
    const newStatus = v.id as CourseStatus;

    setLoading(true);
    try {
      await CoursesAPI.updateCourseStatus(course.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      showAlert({ error });
    } finally {
      setLoading(false);
    }
  };

  return statusUI ? (
    <Dropdown
      disabled={isLoading}
      beforeText={
        <span style={{ background: statusColor }} className={cls.status_dot} />
      }
      items={statuses}
      value={statusUI}
      onChange={onStatusChange}
    />
  ) : null;
};
