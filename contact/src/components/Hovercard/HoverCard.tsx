import React, { Component } from 'react';
import styles from './HoverCard.module.scss';
import { UserProfile } from '../../Model/ProfileModel';
import { Link } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
export interface IUserProfileprops {
  UserProfile: UserProfile;
}
class HoverCard extends Component<IUserProfileprops, {}> {
  
  render() {    
    return (
      <div className={styles.hoverCardContainer}>
        <div className={styles.contactCardContainer}>
          <div className={styles.cardDetails}>
            <p className={styles.userName} >{this.props.UserProfile.displayname}</p>
            <p className={styles.userDesignation}>{this.props.UserProfile.role}</p>
          </div>
          <div className={styles.imageContainer}>
            <span className={`${styles.presenceInfo}`}>              
              {this.props.UserProfile.initials}
              <span > < Icon iconName="StatusCircleRing" className={`${styles.active}`} aria-hidden="true" /></span>
            </span>
          </div>
        </div>
        <div className={styles.hoverCardDetails}>
          <p>{this.props.UserProfile.department}</p>
          <p>{this.props.UserProfile.location}</p>
          {(() => {
            if (this.props.UserProfile.phoneNo !== "") {
              return (
                <p>{this.props.UserProfile.phoneNo}</p>
              )
            }
          })()}
          <p>{this.props.UserProfile.email}</p>
        </div>
        <div className={styles.iconContainer}>

          
          <Link  rel="noopener noreferrer" href={"sip:"+this.props.UserProfile.email}><Icon iconName="CannedChat" title="Chat"/></Link>        
          <Link  rel="noopener noreferrer" href={"mailto:"+this.props.UserProfile.email}><Icon iconName="Mail" title="Email"/></Link>
          <Link  rel="noopener noreferrer" href={"callto:"+this.props.UserProfile.email}><Icon iconName="Phone"  title="Audio call"/></Link>

        </div>
      </div>
    );
  }

}

export default HoverCard;
