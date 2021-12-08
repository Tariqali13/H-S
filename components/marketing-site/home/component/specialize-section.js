import React from 'react';
import {our_mission} from '@/constants/home';
import _get from 'lodash.get';
import Router from "next/router";

const SpecializeSection = () => {
  const handleRoute = id => {
    Router.push(`/mission/${id}`, `/mission/${id}`, { shallow: true });
  };
  return (
    <section className="w3-about text-center">
      <div className="container">
        <h2 className="w3ls_head">Our<span>Mission</span></h2>
        <p className="para">"To Be The Most,<span>Trusted, Reliable and Principled Electrical and Solar Provider</span> in the World"</p>
        {our_mission.map((data, i) => (
          <div className="col-md-4 w3l-abt-grid" key={i} onClick={() => handleRoute(data.id)}>
            <div className="hi-icon-wrap hi-icon-effect-7 hi-icon-effect-7b">
              <a href="#" className="hi-icon icon1">
                <i className={_get(data, 'icon', '')} aria-hidden="true" />
              </a>
            </div>
            <h4>{_get(data, 'heading', '')}</h4>
            <p>{_get(data, 'short_description', '')}</p>
          </div>
        ))}
        <div className="clearfix" />
      </div>
    </section>
  );
};

export { SpecializeSection };