import React from 'react'

class ShowDocuments extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch("http://localhost:8080/api/document/alldocuments")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">
			<h1> Fetch Docs from Backend api </h1> {
				items.map((item) => (
				<ol key = { item.id } >
					<h4>Document ID- { item.id}</h4>
					Document : { item.document },
					<br/>
					Title: { item.title },
					<br/>
					Description: { item.description },
					<br/>
					published: { item.published},
					<br/>
					Download Link: <a href={ item.linkurl }> Click Here</a>
					</ol>
				))
			}
		</div>
	);
}
}

export default ShowDocuments