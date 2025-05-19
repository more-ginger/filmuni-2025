import * as d3 from 'd3';

interface Classic {
	Danceability: number;
	Popularity: number;
	Year: number;
	Track: string;
	Artist: string;
}

const svg = d3.select('svg');
const width = 1280;
const height = 800;
const margin = { top: 40, right: 30, bottom: 50, left: 60 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

d3.csv<Classic>('./data/1980sClassics.csv', d3.autoType).then((data) => {
	// Creation of scales to fit the content on page and potentially style its properties
	const x = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.Danceability) as [number, number])
		.range([0, innerWidth])
		.nice();

	const y = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.Popularity) as [number, number])
		.range([innerHeight, 0])
		.nice();

	const color = d3
		.scaleSequential()
		.domain([1989, 1980])
		.interpolator(d3.interpolateViridis);

	// Creation of base svg group
	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);

	// Appending the axis
	g.append('g')
		.call(d3.axisLeft(y))
		.append('text')
		.attr('class', 'axis-label')
		.attr('x', 30)
		.attr('y', -10)
		// .attr('fill', 'black')
		.attr('text-anchor', 'end')
		.text('Popularity');

	g.append('g')
		.attr('transform', `translate(0,${innerHeight})`)
		.call(d3.axisBottom(x))
		.append('text')
		.attr('class', 'axis-label')
		.attr('x', innerWidth / 2)
		.attr('y', 35)
		// .attr('fill', 'black')
		.text('Danceability');

	// Tooltip-like label group
	const label = g
		.append('text')
		.attr('class', 'hover-label')
		.attr('text-anchor', 'middle')
		.style('visibility', 'hidden')
		.style('pointer-events', 'none')
		.classed('text-fuchsia-500', true)
		.classed('bg-fuchsia-500', true)
		.classed('text-xl', true);

	// Appending circles
	g.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', (d) => x(d.Danceability))
		.attr('cy', (d) => y(d.Popularity))
		.attr('r', 5)
		.attr('fill', (d) => color(d.Year))
		.on('mouseover', (_, d) => {
			// All the interactivity on mouse over happens in here
			const hoveredYear = d.Year;

			// The correct label for the year is rendered
			label
				.text(`${d.Popularity}. ${d.Track} by ${d.Artist}`)
				.attr('x', x(d.Danceability))
				.attr('y', y(d.Popularity) - 10)
				.style('visibility', 'visible');

			// Highlight matching year, fade others
			g.selectAll<SVGCircleElement, Classic>('circle')
				.transition()
				.duration(150)
				.style('opacity', (circleData) =>
					circleData.Year === hoveredYear ? 1 : 0.1,
				)
				.style('stroke', (circleData) =>
					circleData.Year === hoveredYear ? 'red' : 'none',
				);

			// Update the div element to the current year
			d3.select('#year-tooltip').text(hoveredYear);
		})
		.on('mouseout', (event, _) => {
			// All the interactivity on mouse out happen in here
			label.style('visibility', 'hidden');
			d3.select(event.currentTarget).attr('stroke', 'none');

			// Restore all circle opacities
			g.selectAll('circle').transition().duration(150).style('opacity', 1);

			d3.select('#year-tooltip').text('');
		});
});
