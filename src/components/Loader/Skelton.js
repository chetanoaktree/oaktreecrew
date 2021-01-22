import React from 'react';
import ContentLoader from 'react-content-loader'

export const TableListingLoader  = () => (
	  <ContentLoader 
	    speed={2}
	    height={25}
	    width={'95%'}
	    backgroundColor="#f3f3f3"
	    foregroundColor="#ecebeb"
	  >
	    <rect x="5" y="5" rx="3" ry="3" width="100%" height="15" /> 
	  </ContentLoader>
)

export const CardListingLoader  = () => (
	<ContentLoader 
	  speed={2}
	  height={230}
	  width={240}
	  viewBox="0 0 240 280"
	  backgroundColor="#f3f3f3"
	  foregroundColor="#ecebeb"
	>
	  <circle cx="400" cy="170" r="300" />		 
	   
	</ContentLoader>
)



