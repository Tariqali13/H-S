import React from "react";
import { useRouter } from "next/router";
import {our_mission} from '@/constants/home';
import _get from 'lodash.get';

const MissionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const findMission = our_mission.find(mission => mission.id == id);
  return (
    <div className="services-w3ls">
      <div className="container">
        <h2 className="w3ls_head">{_get(findMission, 'heading', '')}</h2>
        <div className="agile_banner_bottom_grids">
          <div className="col-md-12 w3layouts_about_grid_left flex-div">
            <h5>{_get(findMission, 'short_description', '')}</h5>
            <p>{_get(findMission, 'data.complete_description', '')} </p>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </div>
  );
};
export { MissionDetail };