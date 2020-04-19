import React from 'react';
import styles from '../Contactcard/ContactCards.module.scss';
// import { GraphData } from '../../GetGraphData';
import { UserProfile } from '../../Model/ProfileModel';
import HoverCardUI from '../Hovercard/HoverCard';
import { HoverCard, IPlainCardProps, HoverCardType, DirectionalHint } from 'office-ui-fabric-react/lib/HoverCard';
import { Icon, initializeIcons} from 'office-ui-fabric-react';

initializeIcons();
export interface IEmailprops {
  User: UserProfile;
}
export interface IContactCardState {
  displayName: string;
  role: string;
  initials: string;
  resObject: UserProfile;
  showHoverCard: boolean; 
}
class ContactCard extends React.Component<IEmailprops, IContactCardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      displayName: this.props.User.displayname,
      role: this.props.User.role,
      initials: this.props.User.initials,
      resObject: this.props.User,
      showHoverCard: false      
    }
  }

  render() {
    const plainCardProps: IPlainCardProps = {
      onRenderPlainCard: this._onRenderPlainCard,
      directionalHint: DirectionalHint.rightTopEdge,
    };

    return (
      <div className={styles.contactCardHoverContainer}>
        <HoverCard cardOpenDelay={600} plainCardProps={plainCardProps} instantOpenOnClick={true} type={HoverCardType.plain}>
          <div className={styles.contactCardContainer}>
            
            <div className={styles.cardDetails}>
              <p className={styles.userName} >{this.props.User.displayname}</p>
              <p className={styles.userDesignation}>{this.props.User.role}</p>
            </div>
            <div className={styles.imageContainer}>
              <span className={`${styles.presenceInfo}`}>
                {this.props.User.initials}
                <span> < Icon iconName="StatusCircleRing" className={`${styles.active}`} aria-hidden="true" /></span>
              </span>
            </div>
          </div>
        </HoverCard>        
      </div >
    );
  }

  //Rending HoverCard Html
  private _onRenderPlainCard = (): any => {
    return <HoverCardUI UserProfile={this.state.resObject} />
  };

}

export default ContactCard;
